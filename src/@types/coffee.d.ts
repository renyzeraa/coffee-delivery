export interface Root {
    coffees: Coffee[]
}

export interface Coffee {
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
}
