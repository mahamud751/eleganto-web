-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentMethod" TEXT NOT NULL DEFAULT 'COD',
ADD COLUMN     "paymentNumber" TEXT,
ADD COLUMN     "transactionId" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "colors" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "sizes" TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL', '2XL']::TEXT[];
