import { Timestamp } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";

// admin management
export interface AdminSchema {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roleId: Array<string>,
    createdAt: Timestamp,
    lastLogin: Timestamp,
    modifiedAt: Timestamp,
    deletedAt: Timestamp,
}

export interface RoleSchema {
    id: string,
    roleName: string,
}

// client management
export interface UserSchema {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    adresses: Array<object>,
    createdAt: Timestamp,
    lastLogin: Timestamp,
    modifiedAt: Timestamp,
    deletedAt: Timestamp,
}

export interface OrderSchema {
    id: string,
    userId: string,
    productId: string,
    quantity: number,
    createdAt: Timestamp,
    modifiedAt: Timestamp,
}



// product management
export interface ProductSchema {
    id: string,
    productName: string,
    categoryId: string,
    brandId: string,
    tags: Array<string>,
    price: number,
    createdAt: Timestamp,
    modifiedAt: Timestamp,
    deletedAt: Timestamp,
}

export interface InventorySchema {
    id: string,
    quantity: number,
    createdAt: Timestamp,
    modifiedAt: Timestamp,
    deletedAt: Timestamp,
}

export interface CategoriesSchema {
    id: string,
    categoryName: string,
    createdAt: Timestamp,
    modifiedAt: Timestamp,
    deletedAt: Timestamp,
}

export interface TagSchema {
    id: string,
    tagName: string,
    createdAt: Timestamp,
    modifiedAt: Timestamp,
    deletedAt: Timestamp,
}

export interface BrandsSchema {
    id: string,
    brandName: string,
    createdAt: Timestamp,
    modifiedAt: Timestamp,
    deletedAt: Timestamp,
}