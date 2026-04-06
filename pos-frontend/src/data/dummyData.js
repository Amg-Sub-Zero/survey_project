export const products = [
  { id: 1, name: "Coca Cola 500ml", category: "Beverages", price: 2.5, quantity: 120, barcode: "5000112637922", status: "In Stock" },
  { id: 2, name: "Bread Loaf", category: "Bakery", price: 3.0, quantity: 8, barcode: "1234567890123", status: "Low Stock" },
  { id: 3, name: "Milk 1L", category: "Dairy", price: 1.8, quantity: 45, barcode: "9876543210987", status: "In Stock" },
  { id: 4, name: "Rice 1kg", category: "Grains", price: 4.5, quantity: 3, barcode: "1111222233334", status: "Low Stock" },
  { id: 5, name: "Eggs (12 pack)", category: "Dairy", price: 5.0, quantity: 60, barcode: "5555666677778", status: "In Stock" },
  { id: 6, name: "Orange Juice 1L", category: "Beverages", price: 3.5, quantity: 0, barcode: "9999000011112", status: "Out of Stock" },
  { id: 7, name: "Chicken Breast 500g", category: "Meat", price: 7.0, quantity: 25, barcode: "3333444455556", status: "In Stock" },
  { id: 8, name: "Pasta 500g", category: "Grains", price: 2.2, quantity: 90, barcode: "7777888899990", status: "In Stock" },
  { id: 9, name: "Tomato Sauce", category: "Condiments", price: 1.5, quantity: 5, barcode: "2222333344445", status: "Low Stock" },
  { id: 10, name: "Butter 250g", category: "Dairy", price: 3.2, quantity: 30, barcode: "6666777788889", status: "In Stock" },
];

export const customers = [
  { id: 1, name: "Alice Johnson", phone: "0712345678", email: "alice@email.com", loyaltyPoints: 320 },
  { id: 2, name: "Bob Smith", phone: "0723456789", email: "bob@email.com", loyaltyPoints: 150 },
  { id: 3, name: "Carol White", phone: "0734567890", email: "carol@email.com", loyaltyPoints: 540 },
  { id: 4, name: "David Brown", phone: "0745678901", email: "david@email.com", loyaltyPoints: 80 },
];

export const salesData = [
  { day: "Mon", sales: 420 },
  { day: "Tue", sales: 380 },
  { day: "Wed", sales: 510 },
  { day: "Thu", sales: 290 },
  { day: "Fri", sales: 670 },
  { day: "Sat", sales: 820 },
  { day: "Sun", sales: 350 },
];

export const categoryData = [
  { name: "Beverages", value: 35 },
  { name: "Dairy", value: 25 },
  { name: "Grains", value: 20 },
  { name: "Meat", value: 12 },
  { name: "Other", value: 8 },
];

export const recentSales = [
  { id: "INV-001", customer: "Alice Johnson", total: 24.5, date: "2026-04-06", method: "Cash" },
  { id: "INV-002", customer: "Walk-in", total: 12.0, date: "2026-04-06", method: "Card" },
  { id: "INV-003", customer: "Bob Smith", total: 38.75, date: "2026-04-05", method: "Mobile Money" },
  { id: "INV-004", customer: "Walk-in", total: 9.5, date: "2026-04-05", method: "Cash" },
];
