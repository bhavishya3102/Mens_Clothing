import { Clock, TrendingUp, Truck } from 'lucide-react'
import React from 'react'

const ReturnPolicy = () => {
  return (
    <div className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center space-x-4">
          <Truck className="h-8 w-8" />
          <div>
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-gray-600">On orders over $150</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Clock className="h-8 w-8" />
          <div>
            <h3 className="font-semibold">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <TrendingUp className="h-8 w-8" />
          <div>
            <h3 className="font-semibold">Trending Styles</h3>
            <p className="text-gray-600">Updated weekly</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ReturnPolicy
