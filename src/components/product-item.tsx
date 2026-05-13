import { Product } from "types";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useState } from "react";

export interface ProductItemProps {
  product: Product;
  /**
   * Whether to replace the current page when user clicks on this product item. Default behavior is to push a new page to the history stack.
   * This prop should be used when navigating to a new product detail from a current product detail page (related products, etc.)
   */
  replace?: boolean;
}

export default function ProductItem(props: ProductItemProps) {
  const [selected, setSelected] = useState(false);

  return (
    <TransitionLink
      className="flex flex-col cursor-pointer group active:scale-[0.98] transition-transform duration-300 ease-out shadow-sm rounded-lg overflow-hidden bg-white animate-fade-in-up"
      to={`/product/${props.product.id}`}
      replace={props.replace}
      onClick={() => setSelected(true)}
    >
      {({ isTransitioning }) => (
        <>
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img
              src={props.product.image}
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
            style={{
              viewTransitionName:
                isTransitioning && selected // only animate the "clicked" product item in related products list
                  ? `product-image-${props.product.id}`
                  : undefined,
            }}
            alt={props.product.name}
            />
          </div>
          <div className="p-3">
            <div className="text-3xs text-subtitle truncate">
              {props.product.category.name}
            </div>
            <div className="text-xs h-9 line-clamp-2">{props.product.name}</div>
            <div className="mt-0.5 text-sm font-medium">
              {formatPrice(props.product.price)}
            </div>
            <div className="text-3xs text-subtitle line-through">
              {formatPrice(props.product.price)}
            </div>
          </div>
        </>
      )}
    </TransitionLink>
  );
}
