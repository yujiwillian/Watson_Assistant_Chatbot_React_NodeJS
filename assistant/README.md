# Assistant Service API

Watson Assistant service to get session and exchange message with IBM Watson Assistant.

# Github commands:
To verify which repository your project is:
##### git remote -v

Example:  And it will shows the path: https://github.com/Project/assistant
  (This is on Assistant directory, if you are in Backend - shows the backend repository).

If you need to put your project into another repository in github, do:
##### git remote set-url origin link.com/nome.git
 
Done! Your project it's going into a new repository.

## To create a branch:
##### git checkout –b nome_branch
 
## To see what branch you are or which files you updated:
##### git status
 
Example: It will shows that you're on branch "main" and there's 2 files that were updated in red ("src/components/app/app.js" and "src/contexts/user-context.js").


## To upload files that were updated on github:
#### git add .
#### git commit –m 'type here what you did'
 
You leave a comment of what you've done (about the files you uploaded)

## To publish on github:
If this is your first time that you created the branch:
#### git push --set-upstream origin nome_branch
 
If this is not your first time that you created the branch:
#### git push
 
You will notice that the commit it's on your Github branch.

 
## To verify what branch you are and which branches exists:
#### git branch -l

It will shows all the branches of your project, the "green" ones - it's what you're using.

## To change the branch:
#### git checkout name_branch

Example: You were to dev to main branch

## If don't see all the branches:
#### git pull

It will refresh all the branches on your local (desktop)
