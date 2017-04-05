export function mountTakeEffect(effect,mountpoint,types){
    const nameAsPrefix = mountpoint.toUpperCase() + "_";
    var patternPrefix = types.indexOf(effect.TAKE.pattern) >=0? nameAsPrefix : "";
    return {...effect,
        TAKE: {
            ...effect.TAKE,
            pattern: patternPrefix + effect.TAKE.pattern
        }
    };
}
export function mountSelectEffect(effect,mountpoint,selectors){
    if ((selectors || []).indexOf(effect.SELECT.selector) >= 0) {
        return {
            ...effect,
            SELECT: {
                ...effect.SELECT,
                selector: state => effect.SELECT.selector(state[mountpoint])
            }
        }
    } else {
        return effect;
    }
}
export function mountPutEffect(effect,mountpoint,types){
    if (types.indexOf(effect.PUT.action.type) >=0) {
        const nameAsPrefix = mountpoint.toUpperCase() + "_";
        return {
            ...effect,
            PUT: {
                ...effect.PUT,
                action: {
                    ...effect.PUT.action,
                    type: nameAsPrefix + effect.PUT.action.type
                }
            }
        }
    } else {
        return effect;
    }
}

