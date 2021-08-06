{ PythonShell } = require "python-shell"
yaml = require "js-yaml"
path = require "path"

write = (args) ->
  options =
    mode: "text",
    scriptPath: path.join(process.cwd(), "WIP/"),
    args: ["./logs/#{new Date()}", yaml.dump args]

  PythonShell.run "write_file.py", options, (err, result) ->
    if err
      throw err

    console.log result.toString()
  return


# obj =
#   message: "Error.message",
#   origin: "command name",
#   details:
#     user: user id,
#     guild: guild id,
#     user_args: ...args
#
# write obj
module.exports = write
