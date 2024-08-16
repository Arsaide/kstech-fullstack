import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductsList.module.scss';
import { useGetCategories } from '@/hooks/queries/use-get-categories/useGetCategories';
import { useGetProductsByCategory } from '@/hooks/queries/use-get-products-by-category/useGetProductsByCategory';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import { priceConvert } from '@/utils/priceConvert';
import ProductsListByCategory from '@/components/pages/main-page/components/products-list-by-category/ProductsListByCategory';
import ProductsListByCategorySkeleton from '@/components/pages/main-page/components/products-list-by-category-skeleton/ProductsListByCategorySkeleton';
import { useGetPopularProducts } from '@/hooks/queries/use-get-popular-products/useGetPopularProducts';

const ProductsList = () => {
    const [selectedCategory, setSelectedCategory] = useState<{ id: string; category: string }[]>(
        [],
    );

    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategories();

    const {
        data: popularProducts,
        isLoading: popularProductsLoading,
        isError: popularProductsError,
    } = useGetPopularProducts({ page: 1 });

    const randomCategories = useMemo(() => {
        if (categories && categories.length > 0) {
            const random = [...categories].sort(() => 0.5 - Math.random());
            return random.slice(0, 2).map(category => ({
                id: category.id,
                category: category.category,
            }));
        }
        return [];
    }, [categories]);

    useEffect(() => {
        if (selectedCategory.length === 0 && randomCategories.length > 0) {
            setSelectedCategory(randomCategories);
        }
    }, [randomCategories, selectedCategory]);

    const {
        data: products1,
        isLoading: productsLoading1,
        isError: productsError1,
    } = useGetProductsByCategory({ categoryId: selectedCategory[0]?.id, page: 1 });
    const {
        data: products2,
        isLoading: productsLoading2,
        isError: productsError2,
    } = useGetProductsByCategory({ categoryId: selectedCategory[1]?.id, page: 1 });

    const isLoading =
        categoriesLoading || popularProductsLoading || productsLoading1 || productsLoading2;

    if (isLoading) {
        return (
            <section className={styles.productsList}>
                <div className={styles.cnt}>
                    <ProductsListByCategorySkeleton />
                    <ProductsListByCategorySkeleton />
                    <ProductsListByCategorySkeleton />
                </div>
            </section>
        );
    }

    return (
        <section className={styles.productsList}>
            <div className={styles.cnt}>
                {popularProducts?.products && (
                    <ProductsListByCategory
                        categoryName={'Популярні товари'}
                        productsArr={popularProducts}
                        link={'/popular-products'}
                    />
                )}
                {selectedCategory[0]?.category && (
                    <ProductsListByCategory
                        categoryName={selectedCategory[0].category}
                        productsArr={products1}
                        link={'/catalog/category-products'}
                        id={selectedCategory[0]?.id}
                    />
                )}
                {selectedCategory[1]?.category && (
                    <ProductsListByCategory
                        categoryName={selectedCategory[1].category}
                        productsArr={products2}
                        link={'/catalog/category-products'}
                        id={selectedCategory[1]?.id}
                    />
                )}
            </div>
        </section>
    );
};

export default ProductsList;
