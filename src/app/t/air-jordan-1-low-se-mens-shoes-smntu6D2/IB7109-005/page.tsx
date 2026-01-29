
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import RelatedProducts from "@/components/RelatedProducts";
import Footer from "@/components/Footer";

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Product section */}
        <section className="max-w-[1920px] mx-auto px-4 md:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="lg:sticky lg:top-36 lg:self-start">
              <ProductGallery />
            </div>

            {/* Product Info */}
            <div className="max-w-[500px]">
              <ProductInfo />
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts />
      </main>

      <Footer />
    </div>
  );
}

