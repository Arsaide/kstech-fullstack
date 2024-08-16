'use client';
import React from 'react';
import useProductsStore from '@/api/store/ProductStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import styles from '@/components/pages/catalog/products-page/Products.module.scss';
import ProductCard from '@/components/ui/product-card/ProductCard';
import Pagination from '@/components/ui/pagination/Pagination';
import ProductsSkeleton from '@/components/pages/catalog/components/products-skeleton/ProductsSkeleton';
import { TriangleAlert } from 'lucide-react';

const CategoryProducts = () => {
    const { getProductByCategory } = useProductsStore();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const id = searchParams.get('id');
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { isLoading, isSuccess, isError, error, data } = useQuery({
        queryKey: ['get-products-page-by-category', currentPage, id],
        queryFn: () => getProductByCategory(id, currentPage),
        select: data => data.data,
        placeholderData: keepPreviousData,
    });

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        window.history.pushState(null, '', `${pathname}?${params.toString()}`);
    };

    const breadcrumbsItems = [
        { label: 'Каталог', href: '/catalog' },
        {
            label: data?.Category.category,
        },
    ];

    if (isLoading) return <ProductsSkeleton />;
    if (isError) return <ProductsSkeleton />;

    return (
        <>
            <Breadcrumbs items={breadcrumbsItems} />
            {data?.products.length != 0 ? (
                <>
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
                </>
            ) : (
                <p className={styles.warning}>
                    <TriangleAlert />
                    Товарів не знайдено!
                </p>
            )}
        </>
    );
};

export default CategoryProducts;
