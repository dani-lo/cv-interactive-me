import os
import boto3

# AMI = os.environ['AMI']
# INSTANCE_TYPE = os.environ['INSTANCE_TYPE']
# KEY_NAME = os.environ['KEY_NAME']
# SUBNET_ID = os.environ['SUBNET_ID']
REGION = os.environ['REGION']

ec2 = boto3.client('ec2', region_name=REGION)

def lambda_handler(event, context):
    
    response = ec2.start_instances(InstanceIds=['0ea376c5603bc1d29'])

    # instance_id = instance['Instances'][0]['InstanceId']
    # print instance_id

    return response