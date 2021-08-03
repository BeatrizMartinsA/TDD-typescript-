import { Money, Dollar, Euro } from "./money"

describe('Money', () => {
    it('should correctly hanlde dollar multiplication', () => {
        const five: Money = Money.dollar(5)
        expect(five.times(2).equals(Money.dollar(10))).toBeTruthy()
        expect(five.times(3).equals(Money.dollar(15))).toBeTruthy()
    })

    it('should correctly hanlde euro multiplication', () => {
        const five: Money = Money.euro(5)
        expect(five.times(2).equals(Money.euro(10))).toBeTruthy()
        expect(five.times(3).equals(Money.euro(15))).toBeTruthy()
    })

    it('should correctly handle dollar equality', () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
        expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy()
    })

    it('should correctly handle euro equality', () => {
        expect(Money.euro(5).equals(Money.euro(5))).toBeTruthy()
        expect(Money.euro(5).equals(Money.euro(6))).toBeFalsy()
    })

    it('should correctly handle money equality', () => {
        expect(Money.euro(5).equals(Money.dollar(5))).toBeFalsy()
        expect(new Money(5, 'USD').equals(Money.dollar(5))).toBeTruthy()
    })

    it('should correctly handle currencies', () => {
        expect(Money.dollar(1).currency()).toEqual('USD')
        expect(Money.euro(1).currency()).toEqual('EUR')
    })
})