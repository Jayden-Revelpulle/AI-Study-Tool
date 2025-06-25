"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("../controllers/item.controller");
const router = express_1.default.Router();
// GET all items
router.get('/', item_controller_1.itemController.getAllItems);
// GET single item by ID
router.get('/:id', item_controller_1.itemController.getItemById);
// POST new item
router.post('/', item_controller_1.itemController.createItem);
// PUT update item
router.put('/:id', item_controller_1.itemController.updateItem);
// DELETE item
router.delete('/:id', item_controller_1.itemController.deleteItem);
exports.itemRoutes = router;
