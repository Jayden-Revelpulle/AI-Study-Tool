"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemController = void 0;
// Mock database
let items = [];
exports.itemController = {
    // Get all items
    getAllItems: async (req, res) => {
        try {
            res.status(200).json(items);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching items' });
        }
    },
    // Get single item by ID
    getItemById: async (req, res) => {
        try {
            const item = items.find(item => item.id === parseInt(req.params.id));
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching item' });
        }
    },
    // Create new item
    createItem: async (req, res) => {
        try {
            const newItem = {
                id: items.length + 1,
                name: req.body.name,
                description: req.body.description
            };
            items.push(newItem);
            res.status(201).json(newItem);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating item' });
        }
    },
    // Update item
    updateItem: async (req, res) => {
        try {
            const itemIndex = items.findIndex(item => item.id === parseInt(req.params.id));
            if (itemIndex === -1) {
                return res.status(404).json({ message: 'Item not found' });
            }
            items[itemIndex] = {
                ...items[itemIndex],
                ...req.body
            };
            res.status(200).json(items[itemIndex]);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating item' });
        }
    },
    // Delete item
    deleteItem: async (req, res) => {
        try {
            const itemIndex = items.findIndex(item => item.id === parseInt(req.params.id));
            if (itemIndex === -1) {
                return res.status(404).json({ message: 'Item not found' });
            }
            items = items.filter(item => item.id !== parseInt(req.params.id));
            res.status(200).json({ message: 'Item deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting item' });
        }
    }
};
