import { Router } from "express"
import { searchProducts } from "../controllers/product_controllers"

const productRouter = Router()

productRouter.get("/search", searchProducts)

export { productRouter }
