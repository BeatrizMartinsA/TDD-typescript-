import { Bank } from "./bank"
import { Expression } from "./expression"
import { Money } from "./money"

describe('Money', () => {
    it('should hanlde multiplication', () => {
        const five: Money = Money.dollar(5)
        expect(five.times(2).equals(Money.dollar(10))).toBeTruthy()
        const four: Money = Money.euro(4)
        expect(four.times(3).equals(Money.euro(12))).toBeTruthy()
    })

    it('should handle equality', () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
        expect(Money.euro(5).equals(Money.euro(6))).toBeFalsy()
        expect(Money.euro(5).equals(Money.dollar(5))).toBeFalsy()
    })

    it('should handle currencies', () => {
        expect(Money.dollar(1).currency()).toEqual('USD')
        expect(Money.euro(1).currency()).toEqual('EUR')
    })

    it('should handle simple addition', () => {
        const five = Money.dollar(5)
        const sumDollar: Expression = five.plus(five)
        const bank = new Bank()
        const reduced: Money = bank.reduce(sumDollar, 'USD')
        expect(reduced.equals(Money.dollar(10))).toBeTruthy()
    })
})