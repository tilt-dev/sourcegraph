shared_go_src = [
  'internal',
  'enterprise',
  'migrations',
  'schema',
]

def cmd_with_env(cmd):
  if cmd:
    return "source dev/env.sh && (%s)" % (cmd)
  else:
    return cmd

def go_lr(name, deps=[], resource_deps=[], serve_cmd=None, **kwargs):
  cmd = 'dev/go-install.sh %s' % (name)
  if not serve_cmd:
    # for most go resources, the serve command is just the resource name
    serve_cmd = name
  # it seems like every other go service emits errors on startup if frontend isn't running, so let's say they depend on frontend
  if name != 'frontend':
    resource_deps = resource_deps + ['frontend']
  resource_deps = resource_deps + ['schema']
  deps = deps + shared_go_src + ['cmd/%s' % (name), 'dev/go-install.sh']
  lr(name, cmd, serve_cmd, deps=deps, resource_deps=resource_deps, **kwargs)

def lr(name, cmd='', serve_cmd='', deps=[], **kwargs):
  local_resource(name, cmd_with_env(cmd), serve_cmd=cmd_with_env(serve_cmd), deps=deps + ['dev/env.sh'], **kwargs)

go_lr('gitserver')
go_lr('query-runner')
go_lr('repo-updater')
go_lr('searcher',)
go_lr('replacer')
go_lr('symbols', serve_cmd='./cmd/symbols/build.sh execute')
go_lr('github-proxy')
go_lr('frontend', serve_cmd='env CONFIGURATION_MODE=server SITE_CONFIG_ESCAPE_HATCH_PATH=$HOME/.sourcegraph/site-config.json frontend')
lr('nginx', serve_cmd="nginx -p . -g 'daemon off;' -c $PWD/dev/nginx.conf 2>&1 | grep -v 'could not open error log file'")
lr('web', serve_cmd='./node_modules/.bin/gulp --color watch')
lr('syntect_server', serve_cmd='./dev/syntect_server')
lr('zoekt-indexserver-0', serve_cmd='./dev/zoekt/wrapper indexserver 0', resource_deps=['gitserver', 'frontend'])
lr('zoekt-indexserver-1', serve_cmd='./dev/zoekt/wrapper indexserver 1', resource_deps=['gitserver', 'frontend'])
lr('zoekt-webserver-0', serve_cmd='./dev/zoekt/wrapper webserver 0', resource_deps=['gitserver', 'frontend'])
lr('zoekt-webserver-1', serve_cmd='./dev/zoekt/wrapper webserver 1', resource_deps=['gitserver', 'frontend'])

# if keycloak isn't supposed to run, specify it as a cmd instead of a serve_cmd
keycloak_test = str(local('dev/env.sh && ( if [ -n "$NO_KEYCLOAK" ]; then echo "echo Not using Keycloak. Keycloak authentication providers will not work."; fi; if [ -z "$ENTERPRISE" ]; then echo Not using Keycloak. Only runs in enterprise mode.; fi )'))
if keycloak_test.find("Not using Keycloak") == -1:
  lr('keycloak', serve_cmd='./dev/auth-provider/keycloak.sh')
else:
  lr('keycloak', cmd='./dev/auth-provider/keycloak.sh')

# lr('jaeger', serve_cmd='docker run --name=jaeger --rm -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p5778:5778 -p16686:16686 -p14268:14268 jaegertracing/all-in-one:latest')
lr('docsite', serve_cmd='.bin/docsite -config doc/docsite.json serve -http=localhost:5080')
lr('lsif-server', serve_cmd='yarn --cwd lsif run run:server', deps=['cmd/lsif-server'] + shared_go_src, resource_deps=['schema', 'frontend'])
lr('lsif-worker', serve_cmd='yarn --cwd lsif run run:worker', resource_deps=['frontend'])
lr('prometheus', serve_cmd='./dev/prometheus.sh')
lr('grafana', serve_cmd='./dev/grafana.sh')
lr('postgres_exporter', serve_cmd='./dev/postgres_exporter.sh')

lr('generate_graphql', 'go generate github.com/sourcegraph/sourcegraph/cmd/frontend/graphqlbackend', deps=['cmd/frontend/graphqlbackend/schema.graphql'])
lr('generate_jsonnet', 'docker-images/grafana/jsonnet/build.sh', deps=['docker-images/grafana/jsonnet'], ignore=['docker-images/grafana/jsonnet/**/*.json'])
lr('schema', 'go generate github.com/sourcegraph/sourcegraph/schema', deps=['schema'], ignore=['schema/**/*.go'])
lr('codeintel', 'yarn run build-ts')
