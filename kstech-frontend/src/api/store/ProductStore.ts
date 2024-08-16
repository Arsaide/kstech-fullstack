import { create } from 'zustand';
import ProductService from '@/api/services/ProductService';
import {
    AllProductResponseModel,
    OneProductResponseModel,
    OneProductTypes,
    OrderTypes,
} from '@/api/models/ProductsModels';
import { AxiosResponse } from 'axios';

interface ProductStoreTypes {
    getProducts: (page: number) => Promise<AxiosResponse<AllProductResponseModel>>;
    searchProducts: (
        query: string,
        page: number,
    ) => Promise<AxiosResponse<AllProductResponseModel>>;
    getProductByCategory: (
        categoryId: string | null,
        page: number,
    ) => Promise<AxiosResponse<AllProductResponseModel>>;
    getProductBySubcategory: (
        categoryId: string | null,
        page: number,
    ) => Promise<AxiosResponse<AllProductResponseModel>>;
    getPopularProducts: (page: number) => Promise<AxiosResponse<AllProductResponseModel>>;
    getProduct: (id: string | null) => Promise<AxiosResponse<OneProductResponseModel>>;
    buy: (
        product: OneProductTypes[],
        order: number,
        clientName: string,
        surname: string,
        number: string,
        email: string,
        feedback: boolean,
        country: string,
        town: string,
        street: string,
        deliveryMethod: string,
        office?: string,
        comment?: string,
    ) => Promise<AxiosResponse<OrderTypes>>;
}

const useProductsStore = create<ProductStoreTypes>(set => ({
    getProducts: async (page: number) => {
        try {
            return await ProductService.getProductsList(page);
        } catch (error) {
            throw error instanceof Error;
        }
    },

    searchProducts: async (query: string, page: number) => {
        try {
            return await ProductService.searchProducts(page, query);
        } catch (error) {
            throw error instanceof Error;
        }
    },

    getProductByCategory: async (categoryId: string | null, page: number) => {
        try {
            return await ProductService.getProductByCategory(categoryId, page);
        } catch (error) {
            throw error instanceof Error;
        }
    },

    getProductBySubcategory: async (categoryId: string | null, page: number) => {
        try {
            return await ProductService.getProductBySubcategory(categoryId, page);
        } catch (error) {
            throw error instanceof Error;
        }
    },

    getPopularProducts: async (page: number) => {
        try {
            return await ProductService.getPopularProducts(page);
        } catch (error) {
            throw error instanceof Error;
        }
    },

    getProduct: async (id: string | null) => {
        try {
            return await ProductService.getProduct(id);
        } catch (error) {
            throw error instanceof Error;
        }
    },

    buy: async (
        product: OneProductTypes[],
        order: number,
        clientName: string,
        surname: string,
        number: string,
        email: string,
        feedback: boolean,
        country: string,
        town: string,
        street: string,
        deliveryMethod: string,
        office?: string,
        comment?: string,
    ) => {
        try {
            return await ProductService.buy(
                product,
                order,
                clientName,
                surname,
                number,
                email,
                feedback,
                country,
                town,
                street,
                deliveryMethod,
                office,
                comment,
            );
        } catch (error) {
            throw error instanceof Error;
        }
    },
}));

export default useProductsStore;
