'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Input } from '../components/ui/input';
import  Button  from '../components/ui/button';
import { FaShoppingCart } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { BsBoxSeam } from 'react-icons/bs';
import { Badge } from '../components/ui/badge';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  address: string;
  createdAt: Date;
};

export default function VendorDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
        createdAt: (doc.data().createdAt as Timestamp)?.toDate() ?? new Date(),
      }));
      setProducts(data);
      setFiltered(data);
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filteredResults = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredResults);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">👋 Welcome, Vendor</h1>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Profile</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="🔍 Search products..."
          className="w-1/2 shadow-sm"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Badge variant="outline" className="text-blue-600 border-blue-500">New</Badge>
        Recently Added Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-xl p-4 space-y-3">
            <h3 className="text-lg font-semibold capitalize">{product.name}</h3>
            <p className="text-green-700 font-bold">₹{product.price}</p>
            <div className="flex items-center text-sm gap-2 text-gray-600">
              <BsBoxSeam /> Qty: {product.quantity}
            </div>
            <div className="flex items-center text-sm gap-2 text-gray-600">
              <MdLocationPin /> {product.address}
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaShoppingCart /> Cart ({cart.length})
        </h2>
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
          {cart.length === 0 ? (
            <p className="text-gray-400">No items in cart.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-2 text-sm"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
