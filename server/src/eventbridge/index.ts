import Client from './client';
type BasicMonitorData = {
    name: string,
    type?: string
}
/**
 * 基础发送信息方法
 * @param data 
 * @param params 
 */
export function sendMonitorData(data: BasicMonitorData, params = {}) {
    try {
        (async ()=> {
            let client = await Client.createClient();
            await Client.PutEvents(client);
        })()
        
    } catch (e) { };
}

/**
 * 
 * @param data {type:'event',name:'eb'}
 * @returns 
 */
export function SSG(name, type = 'block', params = {}): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (descriptor) {
            const original = descriptor.value
            descriptor.value = function (...args) {
                sendMonitorData({ name, type }, params);
                return original.call(this, ...args);
            }
        } else { // 针对箭头函数做一层代理
            let v = undefined;
            Object.defineProperty(target, propertyKey, {
                get: () => { return v; },
                set: function (c) {
                    v = new Proxy(c, {
                        apply: function (target, thisArg, argumentsList) {
                            sendMonitorData({ name, type }, params);
                            return target.apply(this, argumentsList);
                        }
                    });
                },
                enumerable: true
            });
        }

    }
}





