
const { log } = console;


class Set {
    
    elements ; rules ;
    
    constructor(elements,rules){
        this.elements = elements;
        this.rules = rules;
    }
    
    elementOf(element){
        return (
            this.#isElement(element) ||
            this.#inRules(element) 
        ) ?? false ;
    }
    
    #isElement(element){
        return this.elements.includes(element);
    }
    
    #inRules(element){
        return this.rules.find((rule) => rule.includes(element)) && true;
    }
}


export function fromSequence(...elements){
    return new Set(elements,[]);
}

export function fromRules(...rules){
    
    rules = rules.map(ruleFrom);
    
    log(rules)
    
    return new Set([],rules);
}



function ruleFrom(raw){
    switch(true){
    case 
        'from' in raw && 
        'by'   in raw && 
        'to'   in raw :
        return regularSequence(raw);
    default:
        throw 'Unknown Rule Type';
    }
}

function regularSequence(args){
    
    const { from , by , to } = args;
    
    if(to === from)
        throw 'Not a sequence, to = from';
        
    if(by < 0)
        throw 'Sequence |⟷| must be positive';
        
    if(by === 0)
        throw 'Sequence |⟷| cannot be zero';
        
    return new RegularSequence(args);
}

class RegularSequence { 
    
    direction ; from ; by ; to ;
    
    constructor({ from , by , to }){
        this.direction = (from > to) ? 'left' : 'right';
        this.from = from;
        this.by = by;
        this.to = to;
    }
    
    includes(element){
        
        log('a',this.#above(element))
        log('b',this.#below(element))
        log('m',this.#multiple(element))
        
        return this.#above(element)
            && this.#below(element)
            && this.#multiple(element) ;
    }
    
    #above(element){
        
        const { direction , from , to } = this;
        
        return (direction === 'left')
            ? element < from
            : element > from ;
            
    }
    
    #below(element){
        
        const { direction , from , to } = this;
        
        return (direction === 'left')
            ? element > to
            : element < to ;
    }
    
    #multiple(element){
        
        const { direction , by , from } = this;
        
        const delta = (direction === 'left')
            ? - by : + by ;
        
        return (element - from) % delta === 0;
    }
}
