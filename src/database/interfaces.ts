
// admin management
export interface AdminSchema {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roleId: Array<string>,
    createdAt: string,
    lastLogin: string,
    modifiedAt: string,
    deletedAt: string,
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
    createdAt: string,
    lastLogin: string,
    modifiedAt: string,
    deletedAt: string,
}

export interface OrderSchema {
    id: string,
    userId: string,
    productId: string,
    quantity: number,
    createdAt: string,
    modifiedAt: string,
}



// product management
export interface ProductSchema {
    id: string,
    productName: string,
    categoryId: string,
    brandId: string,
    tags: Array<string>,
    price: number,
    createdAt: string,
    modifiedAt: string,
    deletedAt: string,
}

export interface InventorySchema {
    id: string,
    quantity: number,
    createdAt: string,
    modifiedAt: string,
    deletedAt: string,
}

export interface CategoriesSchema {
    id: string,
    categoryName: string,
    createdAt: string,
    modifiedAt: string,
    deletedAt: string,
}

export interface TagSchema {
    id: string,
    tagName: string,
    createdAt: string,
    modifiedAt: string,
    deletedAt: string,
}

export interface BrandsSchema {
    id: string,
    brandName: string,
    createdAt: string,
    modifiedAt: string,
    deletedAt: string,
}