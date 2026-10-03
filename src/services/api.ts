import {
    categories,
    presentationByProductId,
    products,
    variants,
} from "@/data/catalog";
import type {
    Address,
    CatalogProduct,
    CheckoutReceipt,
    Invoice,
    Order,
    OrderLine,
    Payment,
    Product,
    User,
} from "@/types";

const API_LATENCY_MS = 260;

function wait(milliseconds = API_LATENCY_MS) {
    return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

export async function getCatalog(): Promise<CatalogProduct[]> {
    await wait();
    return products.flatMap((product) => {
        const variant = variants.find((item) => item.productId === product.id);
        const presentation = presentationByProductId[product.id];
        return variant && presentation ? [{ product, variant, presentation }] : [];
    });
}

export async function getCategories() {
    await wait(80);
    return categories;
}

export async function submitCheckout(input: {
    user: User;
    address: Address;
    items: OrderLine[];
}): Promise<CheckoutReceipt> {
    await wait(1100);
    if (input.items.length === 0) throw new Error("Your bag is empty.");

    const quantity = input.items.reduce((total, item) => total + item.quantity, 0);
    const price = input.items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
    );
    const order: Order = {
        id: crypto.randomUUID(),
        orderNo: `ML-${Date.now().toString().slice(-8)}`,
        customer: input.user,
        quantity,
        status: "Completed",
        price,
        orderedDate: new Date().toISOString(),
        orderedBy: input.user.id ?? input.user.profile?.email ?? "guest",
        orderType: "Sales",
    };

    const invoices: Invoice[] = input.items.map((item, index) => {
        const product = products.find(({ id }) => id === item.productId);
        if (!product) throw new Error("A product in your bag is no longer available.");
        return {
            id: crypto.randomUUID(),
            invoiceNo: `${order.orderNo}-${String(index + 1).padStart(2, "0")}`,
            product: product as Product,
            order,
            quantity: item.quantity,
            createdBy: order.orderedBy,
            productId: item.productId,
            user: input.user,
            createdAt: order.orderedDate,
        };
    });
    const payments: Payment[] = invoices.map((invoice) => ({
        id: crypto.randomUUID(),
        status: "Completed",
        invoice,
        createdAt: order.orderedDate,
    }));

    return {
        order,
        items: input.items,
        invoices,
        payments,
        shippingAddress: input.address,
    };
}