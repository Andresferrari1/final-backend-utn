import { Request, Response } from "express"
import { Product } from "../models/product"

const searchProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const name = req.query.name?.toString() || ""
    const products = await Product.find({
      name: { $regex: name, $options: "i" } // búsqueda parcial, insensible a mayúsculas
    })
    res.json({ success: true, data: products, message: "Resultados encontrados" })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
}

export { searchProducts }
