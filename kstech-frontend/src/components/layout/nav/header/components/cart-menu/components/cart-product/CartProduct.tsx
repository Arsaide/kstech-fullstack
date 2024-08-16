import React, { FC } from 'react';
import styles from '@/components/layout/nav/header/components/cart-menu/CartMenu.module.scss';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import { useRouter } from 'next/navigation';

interface CartProductProps {
    id: string;
    name: string;
    imgArr: string[];
    price: string;
    discount: string;
    quantity: number;
    removeProduct: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
}

const CartProduct: FC<CartProductProps> = ({
    id,
    name,
    imgArr,
    price,
    discount,
    quantity,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
}) => {
    const router = useRouter();

    return (
        <li className={styles.item}>
            <div className={styles.top}>
                <Trash2 className={styles.icon} onClick={() => removeProduct(id)} />
                <div
                    className={styles.imgCnt}
                    onClick={() => router.push(`/catalog/subcatalog/${id}`)}
                >
                    <img
                        src={imgArr[0]}
                        alt={`Зображення товару ${name} в кошик`}
                        className={styles.img}
                    />
                </div>
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.bot}>
                <div className={styles.tools}>
                    <div className={styles.counter}>
                        <button
                            className={styles.countBtn}
                            onClick={() => decreaseQuantity(id)}
                            disabled={quantity === 1}
                        >
                            <Minus size={12} />
                        </button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button
                            className={styles.countBtn}
                            onClick={() => increaseQuantity(id)}
                            disabled={quantity >= 50}
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                    <div className={styles.price}>
                        {priceConvert(
                            (parseFloat(discountPriceCalc(price, discount)) * quantity).toFixed(2),
                        )}
                        грн
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartProduct;
