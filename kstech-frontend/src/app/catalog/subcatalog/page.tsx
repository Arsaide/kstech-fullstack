import React from 'react';
import Subcatalog from '@/components/pages/catalog/subcatalog-page/Subcatalog';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

interface GenerateMetadataProps {
    searchParams: { category?: string };
}

export async function generateMetadata({ searchParams }: GenerateMetadataProps): Promise<Metadata> {
    const categoryId = searchParams?.category;

    return {
        title: `KS Tech - Категорії`,
        description:
            'Перегляньте категорії каталогу в магазині KS TECH. Ми пропонуємо різноманітні товари: металеві каркаси, ' +
            "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
            'генератори та інші вироби з металу.',
        keywords: [
            'категорії каталогу',
            'категорії товарів',
            'KS TECH',
            'металеві каркаси',
            'модульні будинки',
            'офіси',
            'кафе',
            'приміщення для охорони',
            'буржуйки',
            'котли',
            'пічки',
            'обладнання для сільського господарства',
            'генератори',
            'вироби з металу',
        ],
        openGraph: {
            title: 'KS Tech - Категорії каталогу',
            description:
                'Перегляньте категорії каталогу в магазині KS TECH. Ми пропонуємо різноманітні товари: металеві каркаси, ' +
                "модульні будинки, офіси, кав'ярні, приміщення для охорони, буржуйки, котли, пічки, обладнання для сільського господарства, " +
                'генератори та інші вироби з металу.',
            url: `https://kstech-frontend.vercel.app/catalog/subcatalog?category=${categoryId}`,
            siteName: 'KS Tech',
            images: [
                {
                    url: 'https://kstech-frontend.vercel.app/preview.jpg',
                    width: 640,
                    height: 336,
                    alt: 'Категорії каталогу KS Tech',
                },
            ],
            locale: 'uk-UA',
            type: 'website',
        },
    };
}

const DynamicSubcatalog = dynamic(() => Promise.resolve(Subcatalog), {
    ssr: false,
});

const SubcatalogPage = () => {
    return (
        <>
            <DynamicSubcatalog />
        </>
    );
};

export default SubcatalogPage;
