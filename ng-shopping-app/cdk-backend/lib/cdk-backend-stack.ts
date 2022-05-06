import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //************Backend API******************** */

    // Appsync Intialized
    const api = new appsync.GraphqlApi(this, 'myGraphqlAPI', {
      name: "Bookmark graphql API",
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        }
      }
    })

    // dynamoDB Table instance
    const bookmarkTable = new dynamodb.Table(this, 'shoppingappTableInstance', {
      tableName: 'shoppingapp',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      }
    })

    // dynamo as a Datasource
    const dynamoDS = api.addDynamoDbDataSource('shoppingappdatasource', bookmarkTable);


    // create resolver
    dynamoDS.createResolver({
      typeName: 'Query',
      fieldName: 'allProducts',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList()
    })

    dynamoDS.createResolver({
      typeName: 'Query',
      fieldName: 'getProduct',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
    })

    dynamoDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'createProduct',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition("id").auto(),
        appsync.Values.projecting()
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
    })
    dynamoDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'deleteProduct',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem('id', 'id'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
    })
    dynamoDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'updateProduct',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').is('id'),
        appsync.Values.projecting()
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
    })

  }
}
