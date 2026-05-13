import { Product } from "types";
import TransitionLink from "./transition-link";
import { useState } from "react";

export interface ProductItemProps {
  product: Product;
  /**
   * Whether to replace the current page when user clicks on this product item.
   */
  replace?: boolean;
}

export default function ProductItem(props: ProductItemProps) {
  const [selected, setSelected] = useState(false);

  return (
    <TransitionLink
      className="flex flex-col cursor-pointer group active:scale-[0.98] transition-all duration-300 ease-out shadow-sm hover:shadow-xl hover:-translate-y-1 rounded-xl overflow-hidden bg-white animate-fade-in-up border border-secondary/20"
      to={`/product/${props.product.id}`}
      replace={props.replace}
      onClick={() => setSelected(true)}
    >
      {({ isTransitioning }) => (
        <>
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-skeleton">
            <img
              src={props.product.image}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{
                viewTransitionName:
                  isTransitioning && selected
                    ? `product-image-${props.product.id}`
                    : undefined,
              }}
              alt={props.product.name}
            />
            {/* Category Badge with Glassmorphism */}
            <div className="absolute top-2 left-2 px-2 py-1 glassmorphism bg-black/30 rounded-md text-[10px] text-white font-medium uppercase tracking-wider shadow-sm">
              {props.product.category?.name || "Dự án"}
            </div>
            
            {/* Dark gradient at the bottom of the image for text readability */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-[15px] font-bold text-white truncate drop-shadow-md">
                {props.product.name}
              </h3>
              <div className="mt-1.5 flex items-center">
                <div className="text-[10px] text-white bg-accent/90 px-2 py-0.5 rounded-sm font-medium shadow-sm transition-colors group-hover:bg-accent">
                  Khám phá ngay
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </TransitionLink>
  );
}
