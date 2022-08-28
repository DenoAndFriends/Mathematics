
import { assertFalse , assert } from 'https://deno.land/std@0.153.0/testing/asserts.ts'
import * as Set from '../Source/Set.js'

const { log } = console;


const ℤ = Set.fromRules(
    
)




Deno.test('Natural Numbers contain 3', () => {
    
    const ℕ_with_0 = Set.fromRules({
        from : 0 , by : 1 , to : Infinity
    })
    
    assert(ℕ_with_0.elementOf(3));
});

Deno.test('Natural Numbers don\'t contain -3', () => {
    
    const ℕ_with_0 = Set.fromRules({
        from : 0 , by : 1 , to : Infinity
    })
    
    assertFalse(ℕ_with_0.elementOf(-3));
});

Deno.test('Natural Numbers don\'t contain 2.1', () => {
    
    const ℕ_with_0 = Set.fromRules({
        from : 0 , by : 1 , to : Infinity
    })
    
    assertFalse(ℕ_with_0.elementOf(2.1));
});
