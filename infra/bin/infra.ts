#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();

new PipelineStack(app, 'PipelineStack', {
  env: { account: '637423178245', region: 'us-east-1' },
});

new InfraStack(app, 'InfraStack', {
  env: { account: '637423178245', region: 'us-east-1' },
});
