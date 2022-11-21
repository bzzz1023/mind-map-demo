import { Graph, Line, Curve, Path } from '@antv/x6';
export const registerEdge = (Graph: any) => {
    Graph.registerEdge(
        'mindmap-edge',
        {
            inherit: 'edge',
            connector: {
                name: 'mindmap',
            },
            attrs: {
                line: {
                    targetMarker: '',
                    stroke: '#A2B1C3',
                    strokeWidth: 2,
                },
            },
            zIndex: 0,
        },
        true,
    )

}

export const registerConnector = (Graph: any) => {
    Graph.registerConnector(
        'multiSmooth',
        (
            sourcePoint: any,
            targetPoint: any,
            _routePoints: any,
            options: { raw?: boolean; index?: number; gap?: number }
        ) => {
            const { index = 0, gap = 90 } = options;
            const line = new Line(sourcePoint, targetPoint);
            const diff = Math.abs(index * 0.3);
            const vertice = line.pointAtLength(line.length() / 2 + gap * diff).rotate(90, line.getCenter());
            const points = [sourcePoint, vertice, targetPoint];
            const curves = Curve.throughPoints(points);
            const path = new Path(curves);
            return options.raw ? path : path.serialize();
        },
        true
    );

}