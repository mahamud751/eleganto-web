import { StoreService } from './store.service';
export declare class DashboardController {
    private store;
    constructor(store: StoreService);
    summary(): Promise<{
        orders: number;
        products: number;
        revenue: number;
        pending: number;
    }>;
}
