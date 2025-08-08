interface Guest {
    id: number;
    name: string;
    lastname: string;
    is_leader: boolean;
    companion_of: number;
}

interface Stat {
    name: string;
    quantity: number;
}