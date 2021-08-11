import { Bank } from "./bank"
import { Expression } from "./expression"
import { Money } from "./money"
import { Sum } from "./sum"

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

    it('should return a sum when plus is used', () => {
        const five = Money.dollar(5)
        const result: Expression = five.plus(five)
        const sum = result as Sum
        expect(sum.augend).toEqual(five)
        expect(sum.addend).toEqual(five)
    })

    it('should reduce from a sum', () => {
        const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4))
        const bank = new Bank()
        const result = bank.reduce(sum, 'USD')
        expect(result).toEqual(Money.dollar(7))
    })

    it('should reduce from a money', () => {
        const bank = new Bank()
        const result: Money = bank.reduce(Money.dollar(1), 'USD')
        expect(result).toEqual(Money.dollar(1))
    })

    it('should reduce from different currencies', () => {
        const bank = new Bank()
        bank.addRate('EUR', 'USD', 2)
        const result = bank.reduce(Money.euro(2), 'USD')
        expect(result).toEqual(Money.dollar(1))
    })

    it('should handle identity rate', () => {
        expect(new Bank().rate('USD', 'USD')).toEqual(1)
    })
})