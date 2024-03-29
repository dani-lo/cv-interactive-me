# resource "aws_lambda_function" "fn-interactiveme-ec2-start" {
#   filename = "../"
# }

# // Allow CloudWatch to invoke our function
# resource "aws_lambda_permission" "allow_cloudwatch_to_invoke" {
#   function_name = aws_lambda_function.my_function.function_name
#   statement_id = "CloudWatchInvoke"
#   action = "lambda:InvokeFunction"

#   source_arn = aws_cloudwatch_event_rule.every_day.arn
#   principal = "events.amazonaws.com"
# }

# // Create the "cron" schedule
# resource "aws_cloudwatch_event_rule" "every_day" {
#   name = "daily"
#   schedule_expression = "rate(1 day)"

#   // or

#   schedule_expression = "cron(0 0 * * *)"
# }

# // Set the action to perform when the event is triggered
# resource "aws_cloudwatch_event_target" "invoke_lambda" {
#   rule = aws_cloudwatch_event_rule.every_day.name
#   arn = aws_lambda_function.my_function.arn
# }
