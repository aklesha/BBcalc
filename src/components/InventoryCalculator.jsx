import React, { useState } from 'react';

const InventoryCalculator = () => {
  const [items, setItems] = useState([]);
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [itemCounter, setItemCounter] = useState(1);

  const addItem = () => {
    if (!stock || !price) {
      setError('Please fill both stock and price fields');
      return;
    }

    if (isNaN(stock) || isNaN(price) || Number(stock) <= 0 || Number(price) <= 0) {
      setError('Stock and price must be positive numbers');
      return;
    }

    const stockNum = Number(stock);
    const priceNum = Number(price);
    const total = stockNum * priceNum;

    const newItem = {
      id: Date.now(),
      name: `Item ${itemCounter}`,
      stock: stockNum,
      price: priceNum,
      total: total
    };

    setItems([...items, newItem]);
    setItemCounter(itemCounter + 1);
    setStock('');
    setPrice('');
    setError('');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalValue = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  // Calculate totals quickly with keyboard
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#f5f2ea] p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-sm text-gray-400 uppercase">{formatDate()}</div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Inventory Calculator</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-[#ff7757] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Input Form */}
            <div className="mb-8 bg-white rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600">Stock Quantity</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7757] focus:border-transparent"
                    placeholder="Enter quantity"
                    min="1"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-600">Unit Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7757] focus:border-transparent"
                    placeholder="Enter price"
                    min="0.01"
                    step="0.01"
                  />
                </div>
              </div>
              
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
              
              <button
                onClick={addItem}
                className="mt-6 w-full px-6 py-3 bg-[#ff7757] text-white font-medium rounded-lg hover:bg-[#ff6242] transition-all duration-200"
              >
                Add Item
              </button>
            </div>
            
            {/* Table */}
            {items.length > 0 ? (
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-100">
                      <th className="px-6 py-4 text-sm font-medium text-gray-500">Name</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Quantity</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Price</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Total Value</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-500 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className={`border-b border-gray-50 ${index === items.length - 1 ? 'bg-[#fff8f6]' : ''}`}>
                        <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-right">{item.stock}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-right">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 text-right">${item.total.toFixed(2)}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-[#ff7757]"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="px-6 py-4 text-right font-medium text-gray-700">Total Inventory Value:</td>
                      <td className="px-6 py-4 text-right font-bold text-lg text-gray-800">${getTotalValue().toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
                
                {/* Pagination */}
                <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    1 - {items.length} of {items.length} items
                  </div>
                  <div className="flex space-x-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ff7757] text-white">
                      1
                    </button>
                    {items.length > 10 && (
                      <>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                          2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">No items added yet.</p>
                <p className="text-gray-400 text-sm mt-1">Start by entering stock and price values.</p>
              </div>
            )}
          </div>
          
          {/* Sidebar - Summary */}
          {items.length > 0 && (
            <div className="w-80 border-l border-gray-100 p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-800 mb-6">Inventory Summary</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Items</span>
                  <span className="text-sm font-medium text-gray-800">{items.length}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Value</span>
                  <span className="text-sm font-medium text-gray-800">${getTotalValue().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Price</span>
                  <span className="text-sm font-medium text-gray-800">
                    ${(getTotalValue() / items.reduce((sum, item) => sum + item.stock, 0)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-700 mb-3">Value Distribution</h3>
              
              {items.slice(0, 3).map((item, index) => (
                <div key={item.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">{item.name}</span>
                    <span className="text-xs font-medium text-gray-800">${item.total.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${index === 0 ? 'bg-[#ff7757]' : index === 1 ? 'bg-[#36b37e]' : 'bg-[#6554c0]'}`} 
                      style={{ width: `${(item.total / getTotalValue()) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              {items.length > 3 && (
                <button className="text-[#ff7757] text-sm font-medium hover:underline mt-2">
                  View all items
                </button>
              )}
              
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Quick Actions</h3>
                <button className="w-full py-2 px-4 mb-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Export Data
                </button>
                <button className="w-full py-2 px-4 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Save Report
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-100 p-4 flex items-center justify-center">
          <div className="flex space-x-6">
            <button className="p-2 text-gray-400 hover:text-[#ff7757]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-[#ff7757]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </button>
            <button className="p-2 text-[#ff7757]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-[#ff7757]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCalculator;
