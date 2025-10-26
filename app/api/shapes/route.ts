import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { shapeSchema } from '@/lib/validations';

/**
 * GET /api/shapes - Fetch paginated shapes (PUBLIC)
 * Query params: page (default: 1), limit (default: 10)
 */
export async function GET(request: NextRequest) {
  console.log('📊 GET /api/shapes - Fetching shapes');

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    console.log(`📄 Pagination: page=${page}, limit=${limit}, skip=${skip}`);

    // Fetch shapes with pagination
    const [shapes, total] = await Promise.all([
      prisma.shape.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.shape.count(),
    ]);

    console.log(`✅ Fetched ${shapes.length} shapes, total: ${total}`);

    return NextResponse.json({
      success: true,
      shapes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('❌ Error fetching shapes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shapes' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/shapes - Create new shape (PROTECTED)
 * Body: { name, color, shape }
 */
export async function POST(request: NextRequest) {
  console.log('➕ POST /api/shapes - Creating shape');

  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      console.log('🚫 Unauthorized: No session');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    console.log('📝 Request body:', body);

    const validation = shapeSchema.safeParse(body);
    if (!validation.success) {
      console.log('❌ Validation failed:', validation.error.cause);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.cause,
        },
        { status: 400 }
      );
    }

    // Create shape
    const shape = await prisma.shape.create({
      data: validation.data,
    });

    console.log('✅ Shape created:', shape.id);
    return NextResponse.json(
      { success: true, shape },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error creating shape:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create shape' },
      { status: 500 }
    );
  }
}