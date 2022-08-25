


const Tokens = [{
    pattern : /^\\([a-z]+)/i ,
    type : 'Command' ,
},{
    pattern : /^ +/ ,
    type : 'Space'
},{
    pattern : /^\{/ ,
    type : 'Block_Start'
},{
    pattern : /^\}/ ,
    type : 'Block_End'
}]


export function tokenize(string){
    
    const tokens = [];
    let unknown;
    
    
    function findToken(){
        for(const token of Tokens)
            if(token.pattern.test(string))
                return token;
    }
    
    while(string.length){
        
        const token = findToken();
        
        if(token){
            
            const { pattern , type } = token;
            
            if(unknown){
                
                tokens.push({
                    type : 'String' ,
                    args : [ unknown ]
                });
                
                unknown = null;
            }
            
            const [ used , ...groups ] = string.match(pattern);
            
            string = string.substring(used.length);
            
            const matched = { type };
            
            if(groups.length)
                matched.args = groups;
            
            tokens.push(matched);
            
            continue;
            
        }
        
        unknown ??= '';
        unknown += string.charAt(0);
        string = string.slice(1);
    }
    
    return tokens;
}


const Symbols = [{
    command : 'lt' ,
    symbol : '<'
},{
    command : 'll' ,
    symbol : '≪'
},{
    command : 'lll' ,
    symbol : '⋘'
},{
    command : 'llless' ,
    symbol : '⋘'
},{
    command : 'le' ,
    symbol : '≤'
},{
    command : 'leq' ,
    symbol : '≤'
},{
    command : 'leqq' ,
    symbol : '≦'
},{
    command : 'leqslant' ,
    symbol : '⩽'
},{
    command : 'lessapprox' ,
    symbol : '⪅'
},{
    command : 'lesssim' ,
    symbol : '≲'
},{
    command : 'nless' ,
    symbol : '≮'
},{
    command : 'lneq' ,
    symbol : '⪇'
},{
    command : 'lneqq' ,
    symbol : '≨'
},{
    command : 'lvertneqq' ,
    symbol : ''
},{
    command : 'nleq' ,
    symbol : '≰'
},{
    command : 'nleqq' ,
    symbol : ''
},{
    command : 'nleqslant' ,
    symbol : ''
},{
    command : 'prec' ,
    symbol : '≺'
},{
    command : 'preceq' ,
    symbol : '⪯'
},{
    command : 'preccurlyeq' ,
    symbol : '≼'
},{
    command : 'precapprox' ,
    symbol : '⪷'
},{
    command : 'precsim' ,
    symbol : '≾'
},{
    command : '' ,
    symbol : ''
},{
    command : '' ,
    symbol : ''
},{
    command : '' ,
    symbol : ''
},{
    command : '' ,
    symbol : ''
},{
    command : '' ,
    symbol : ''
},{
    command : '' ,
    symbol : ''
}]

const Commands = Symbols.map(({ command }) => command);

export function dropIrrelevant(tokens){
    return tokens.filter((token) => {
        switch(token.type){
        case 'Command':
            return Commands.includes(token.args[0]);
        default:
            return true;
        }
    });
}


export function dropEmptyGroups(ast){
    
    function dropAst(ast){
        return ast
            .map(drop)
            .flat()
            .flat();
    }
    
    function drop(token){
        
        console.log('\n',token,'\n');
        
        if(token.type !== 'Command')
            return [ token ];
        
        const [ command ] = token.args;
        
        const useful = Commands.includes(command);
        
        if(!token.options)
            return useful
                ? [ token ] : [] ;
        
        token.options = token.options
            .map(dropAst);
        
        
        if(useful)
            return [ token ];
        
        return token.options?.slice(1) ?? [];
    }
    
    return dropAst(ast)
        .filter(({ type }) => type !== 'Space');
}


export function associate(tokens){
    
    const tree = [];
    
    let lastCommand;
    
    while(tokens.length){
        
        const token = tokens.shift();

        switch(token.type){
        case 'Block_Start':
        
            if(!lastCommand){
                lastCommand = { type : 'Command' , args : [ 'Empty' ] };
                tree.push(lastCommand);
            }
            
            lastCommand.options ??= [];
            lastCommand.options.push(associate(tokens));
        
            continue;
        case 'Block_End':
            return tree;
        case 'Command':
            lastCommand = token;
        default:
            tree.push(token);
        }
    }
    
    return tree;
}