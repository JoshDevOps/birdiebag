import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { InfraStack } from '../lib/infra-stack';

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'BirdieBagPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('JoshDevOps/birdiebag', 'main', {
                    connectionArn: 'arn:aws:codestar-connections:us-east-1:637423178245:connection/6924de9d-4ffd-46a6-a952-2369ee57c21f',
                }),
                commands: [
                    'npm install -g aws-cdk',
                    'npm ci',
                    'npm run build',
                    'npx cdk synth',
                ],
            }),
        });

        // const deployStage = pipeline.addStage(new cdk.Stage(this, 'Deploy', {
        //     env: { account: '637423178245', region: 'us-east-1' },
        // }));

        // new InfraStack(deployStage, 'InfraStack', {
        //     env: { account: '637423178245', region: 'us-east-1' },
        // });
    }
}
