'use client';
import React from 'react';
import useProductsStore from '@/api/store/ProductStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import ProductCard from '@/components/ui/product-card/ProductCard';
import styles from './PopularProducts.module.scss';
import Pagination from '@/components/ui/pagination/Pagination';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import ProductsSkeleton from '@/components/pages/catalog/components/products-skeleton/ProductsSkeleton';

const PopularProducts = () => {
    const { getPopularProducts } = useProductsStore();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['popular-products-page', currentPage],
        queryFn: () => getPopularProducts(currentPage),
        select: data => data.data,
        placeholderData: keepPreviousData,
    });

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        window.history.pushState(null, '', `${pathname}?${params.toString()}`);
    };

    if (isLoading || isError) {
        return (
            <section className={styles.cnt}>
                <ProductsSkeleton />
            </section>
        );
    }

    const breadcrumbsItems = [{ label: 'Популярні товари' }];

    return (
        <section className={styles.cnt}>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.listCnt}>
                <ul className={styles.productsList}>
                    {data?.products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            link={`/catalog/subcatalog/${product.id}`}
                        />
                    ))}
                </ul>
            </div>
            <Pagination
                totalPages={data?.totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default PopularProducts;
