export interface Coin {
    id: number;
    name: string;
    market_cap?: number;
    price_usd?: number;
    volume_24h?: number;
    change_24h?: number;
}