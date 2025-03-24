import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, X, Check, Upload } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
import { User } from '../redux/User/userSlice';
import { toast } from '../Components/ui/use-toast';
import { Input } from '../Components/ui/input';

interface Product {
  name: string;
  image: string;
  description: string;
  id: string;
  quantity_avail: number;
  out_of_stock: boolean;
  price: number;
  ratings: number;
  category: string;
  sub_categories: string[];
}

export const RetailerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    id: '',
    quantity_avail: 0,
    out_of_stock: false,
    price: 0,
    ratings: 0,
    category: '',
    sub_categories: [] as string[]
  });
  const [subCategory, setSubCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const res = await fetch('http://localhost:3000/products', {
  //       credentials: 'include'
  //     });
  //     const data = await res.json();
  //     setProducts(data.products);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, JPEG, GIF)",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setImageFile(file);
  };

  const handleAddSubCategory = () => {
    if (subCategory.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        sub_categories: [...prev.sub_categories, subCategory.trim()]
      }));
      setSubCategory('');
    }
  };

  const handleRemoveSubCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sub_categories: prev.sub_categories.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'sub_categories') {
          productFormData.append(key, JSON.stringify(value));
        } else {
          productFormData.append(key, String(value));
        }
      });

      if (imageFile) {
        productFormData.append('productImage', imageFile);
      }

      console.log('Product formdata is: ', productFormData);

      // const url = editingProduct
      //   ? `http://localhost:3000/products/${editingProduct.id}`
      //   : 'http://localhost:3000/products';

      // const method = editingProduct ? 'PUT' : 'POST';

      // const res = await fetch(url, {
      //   method,
      //   credentials: 'include',
      //   body: productFormData,
      // });

      // if (res.ok) {
      //   toast({
      //     title: editingProduct ? "Product updated" : "Product added",
      //     description: "Your product has been successfully saved."
      //   });
      //   fetchProducts();
      //   setIsModalOpen(false);
      //   setEditingProduct(null);
      //   resetForm();
      // }
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      description: '',
      id: '',
      quantity_avail: 0,
      out_of_stock: false,
      price: 0,
      ratings: 0,
      category: '',
      sub_categories: []
    });
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      image: product.image,
      description: product.description,
      id: product.id,
      quantity_avail: product.quantity_avail,
      out_of_stock: product.out_of_stock,
      price: product.price,
      ratings: product.ratings,
      category: product.category,
      sub_categories: Array.isArray(product.sub_categories) ? product.sub_categories : [],
    });

    setImagePreview(product.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:3000/products/${productId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (res.ok) {
          toast({
            title: "Product deleted",
            description: "The product has been successfully removed."
          });
          // fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-light">Product Management</h1>
            <button
              onClick={() => {
                setEditingProduct(null);
                resetForm();
                setIsModalOpen(true);
              }}
              className="bg-black text-white px-6 py-3 flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-md shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-[3/4] relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-light">{product.name}</h3>
                  <p className="text-gray-600 mt-1">${product.price}</p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity Available
                  </label>
                  <input
                    type="number"
                    name="quantity_avail"
                    value={formData.quantity_avail}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                    required
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ratings (0-5)
                  </label>
                  <input
                    type="number"
                    name="ratings"
                    value={formData.ratings}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                    required
                  />
                </div> */}

                {/* <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    name="out_of_stock"
                    id="out_of_stock"
                    checked={formData.out_of_stock}
                    onChange={handleInputChange}
                    className="h-4 w-4 border-gray-300 rounded text-black focus:ring-black/20"
                  />
                  <label htmlFor="out_of_stock" className="ml-2 block text-sm text-gray-700">
                    Out of Stock
                  </label>
                </div> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>

                <div className="mt-1 flex items-center gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="product-image"
                      className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md h-32 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="h-full object-contain"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-500">
                            Click to upload an image
                          </p>
                          <p className="text-xs text-gray-400">
                            JPG, PNG, JPEG, GIF
                          </p>
                        </div>
                      )}
                      <Input
                        ref={fileInputRef}
                        id="product-image"
                        type="file"
                        accept="image/jpeg, image/png, image/jpg, image/gif"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {!imageFile && !editingProduct && (
                  <p className="text-sm text-red-500 mt-1">
                    Please upload a product image
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20 h-32 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub Categories
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="Add a sub category"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubCategory}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.sub_categories.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.sub_categories.map((category, index) => (
                      <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="text-sm">{category}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubCategory(index)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RetailerDashboard;