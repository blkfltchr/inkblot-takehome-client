// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id:
    'us-east-2:96f2ff55-2c1a-4c52-bf95-1086e0b4d833',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_hPDAId9HZ',
  aws_user_pools_web_client_id: '3ttf4prg740pqaeuu2nrtr3kbv',
  oauth: {
    domain: 'inkblottakehome-local.auth.us-east-2.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
};

export default awsmobile;
