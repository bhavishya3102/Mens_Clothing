import { ShieldCheck, RefreshCcw, ShoppingBag } from 'lucide-react'
import React from 'react'

const ReturnPolicy = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <ShoppingBag className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Premium Quality</h3>
              <p className="text-gray-600">Handpicked fabrics & top craftsmanship</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <RefreshCcw className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Hassle-Free Returns</h3>
              <p className="text-gray-600">30-day easy return & exchange</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ShieldCheck className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Secure Shopping</h3>
              <p className="text-gray-600">100% safe & encrypted transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnPolicy
