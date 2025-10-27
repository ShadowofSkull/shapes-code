import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { shapeSchema } from '@/lib/validations';

/**
 * PUT /api/shapes/[id] - Update shape (PROTECTED)
 * Body: { name?, color?, shape? }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(`✏️ PUT /api/shapes/${id} - Updating shape`);
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

    // Update shape
    const shape = await prisma.shape.update({
      where: { id: parseInt(id) },
      data: validation.data,
    });

    console.log('✅ Shape updated:', shape.id);
    return NextResponse.json({ success: true, shape });
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.log('❌ Shape not found');
      return NextResponse.json(
        { success: false, error: 'Shape not found' },
        { status: 404 }
      );
    }
    console.error('❌ Error updating shape:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update shape' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/shapes/[id] - Delete shape (PROTECTED)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params;
  console.log(`🗑️ DELETE /api/shapes/${id} - Deleting shape`);

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

    // Delete shape
    await prisma.shape.delete({
      where: { id: parseInt(id) },
    });

    console.log('✅ Shape deleted');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.log('❌ Shape not found');
      return NextResponse.json(
        { success: false, error: 'Shape not found' },
        { status: 404 }
      );
    }
    console.error('❌ Error deleting shape:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete shape' },
      { status: 500 }
    );
  }
}