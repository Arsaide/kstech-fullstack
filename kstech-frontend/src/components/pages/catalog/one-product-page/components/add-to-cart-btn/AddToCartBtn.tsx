import React, { useEffect, useState } from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';
import useCartStore from '@/api/store/CartStore';
import styles from '@/components/pages/catalog/one-product-page/OneProduct.module.scss';
import { trackAddToCart } from '@/utils/facebookPixel';
import classNames from 'classnames';

const AddToCartBtn: React.FC<{ product: OneProductTypes }> = ({ product }) => {
    const addProduct = useCartStore(state => state.addProduct);
    const getQuantityById = useCartStore(state => state.getQuantityById);

    const [quantity, setQuantity] = useState(getQuantityById(product.id));

    useEffect(() => {
        const unsubscribe = useCartStore.subscribe(() => {
            setQuantity(getQuantityById(product.id));
        });

        return () => {
            unsubscribe();
        };
    }, [getQuantityById, product.id]);

    const handleAddToCart = () => {
        addProduct(product);

        trackAddToCart(product.id, product.name, product.price);
    };

    return (
        <>
            <button
                className={classNames(styles.buyBtn, { [styles.anim]: quantity == 0 })}
                onClick={handleAddToCart}
                disabled={quantity >= 50}
            >
                <div className={styles.cartIconCnt}>
                    <img
                        className={styles.cartIcon}
                        src={'/icons/cart-icon.svg'}
                        alt={'Іконка кошику'}
                    />
                </div>
                {quantity > 0 ? 'Додати ще' : 'Додати в коршик'}
            </button>
            {quantity > 0 && (
                <span className={styles.quantity}>В кошику {quantity} шт. товару</span>
            )}
        </>
    );
};

export default AddToCartBtn;
