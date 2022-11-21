import { EventArg } from './x6Type/EventType'

export class eventController {
    private graph: any;

    constructor(graph: any) {
        this.graph = graph
    }

    public registerEvent = (events: EventArg[]) => {
        events &&
            events.forEach((event: EventArg) => {
                switch (event.eventName) {
                    case 'node:click': {
                        this.graph.on('node:click', (param: any) => {
                            event.handler && event.handler(param);
                        });
                        break;
                    }
                    case 'node:dblclick': {
                        this.graph.on('node:dblclick', (param: any) => {
                            event.handler && event.handler(param);
                        });
                        break;
                    }
                    case 'edge:dblclick': {
                        this.graph.on('edge:dblclick', (param: any) => {
                            event.handler && event.handler(param);
                        });
                        break;
                    }
                    case 'blank:dblclick': {
                        this.graph.on('blank:dblclick', (param: any) => {
                            event.handler && event.handler(param);
                        });
                        break;
                    }
                    case 'edge:connected': {
                        this.graph.on('edge:connected', (param: any) => {
                            const defaultEdgeId = param.edge.id
                            this.graph.removeCell(defaultEdgeId)
                            event.handler && event.handler(param);
                        });
                        break;
                    }
                }
            });
    };
}