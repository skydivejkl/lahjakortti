#!/bin/sh
set -eu

export PATH=$(pwd)/node_modules/.bin/:$PATH
self=$0

set -x

case ${1:-} in
   deps)
        npm install
   ;;
   build-client)
        webpack -p
   ;;
   build-server)
        mkdir -p lib/server
        cd src/server
        tsc
        cd -
   ;;
   serve-client)
        webpack-dev-server  --port  8081 --inline
   ;;
   server)
        cd src/server
        exec ts-node server.ts
   ;;
   server-dev)
        export DISABLE_AUTH=1
        exec nodemon --ext ts --exec sh $self server
   ;;
   install-git-hook)
        cat > .git/hooks/post-receive <<EOF
#!/bin/sh
set -eu
cd ..
unset GIT_DIR GIT_WORK_TREE
git reset --hard master
sh make.sh production-update
EOF
        chmod a+x .git/hooks/post-receive
   ;;
   production-update)
        $self install-git-hook
        $self
        sudo systemctl restart lahjakortti
   ;;
   "")
        $self deps
        $self build-client
        $self build-server
   ;;
   *)
        echo "Bad task"
        exit 1
   ;;
esac
