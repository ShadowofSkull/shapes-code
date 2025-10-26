'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Check, X } from 'lucide-react';
import ShapeDisplay from '@/components/shared/ShapeDisplay';
import { colorMap } from '@/lib/utils';

interface ShapeFormProps {
  editingShape?: any;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function ShapeForm({ editingShape, onSuccess, onCancel }: ShapeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    color: 'red' as 'red' | 'blue' | 'green' | 'yellow',
    shape: 'circle' as 'circle' | 'square' | 'triangle',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingShape) {
      setFormData({
        name: editingShape.name,
        color: editingShape.color,
        shape: editingShape.shape,
      });
      console.log('✏️ [ShapeForm] Editing shape:', editingShape.id);
    }
  }, [editingShape]);

  // Client-side validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be 100 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 [ShapeForm] Submitting form:', formData);

    if (!validate()) {
      console.log('❌ [ShapeForm] Validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingShape
        ? `/api/shapes/${editingShape.id}`
        : '/api/shapes';
      const method = editingShape ? 'PUT' : 'POST';

      console.log(`🌐 [ShapeForm] ${method} ${url}`);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save shape');
      }

      console.log('✅ [ShapeForm] Success:', result);

      // Reset form
      setFormData({ name: '', color: 'red', shape: 'circle' });
      setErrors({});
      onSuccess();
    } catch (error: any) {
      console.error('❌ [ShapeForm] Error:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    console.log('❌ [ShapeForm] Cancelled');
    setFormData({ name: '', color: 'red', shape: 'circle' });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative z-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {editingShape ? '✏️ Edit Shape' : '✨ Create New Shape'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
              errors.name
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-200 focus:border-blue-500'
            } focus:outline-none`}
            placeholder="Enter shape name (e.g., Happy Circle)"
            maxLength={100}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.name.length}/100 characters
          </p>
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Color <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 flex-wrap">
            {(['red', 'blue', 'green', 'yellow'] as const).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                disabled={isSubmitting}
                className={`w-20 h-20 rounded-full transition-all ${
                  formData.color === color
                    ? 'ring-4 ring-offset-4 ring-gray-800 scale-110'
                    : 'hover:scale-105'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: colorMap[color] }}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
              />
            ))}
          </div>
        </div>

        {/* Shape Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Shape <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 flex-wrap">
            {(['circle', 'square', 'triangle'] as const).map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => setFormData({ ...formData, shape })}
                disabled={isSubmitting}
                className={`p-4 rounded-2xl bg-gray-100 transition-all ${
                  formData.shape === shape
                    ? 'ring-4 ring-blue-500 bg-blue-50 scale-110'
                    : 'hover:bg-gray-200 hover:scale-105'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={shape.charAt(0).toUpperCase() + shape.slice(1)}
              >
                <ShapeDisplay shape={shape} color={formData.color} size={60} />
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {errors.submit}
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : editingShape ? (
              <>
                <Check size={24} />
                Update Shape
              </>
            ) : (
              <>
                <Plus size={24} />
                Add Shape
              </>
            )}
          </button>

          {editingShape && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <X size={24} />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}