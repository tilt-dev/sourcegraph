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

def lr(name, cmd='', serve_cmd='', deps=[], **kwargs):
  local_resource(name, cmd_with_env(cmd), serve_cmd=cmd_with_env(serve_cmd), deps=deps + ['dev/env.sh'], **kwargs)

lr('gitserver', cmd='./dev/go-install.sh gitserver', serve_cmd='gitserver', deps=['cmd/gitserver'] + shared_go_src, resource_deps=['schema'])
lr('query-runner', cmd='./dev/go-install.sh query-runner', serve_cmd='query-runner', deps=['cmd/query-runner'] + shared_go_src, resource_deps=['schema'])
lr('repo-updater', cmd='./dev/go-install.sh repo-updater', serve_cmd='repo-updater', deps=['cmd/repo-updater'] + shared_go_src, resource_deps=['schema'])
lr('searcher', cmd='./dev/go-install.sh searcher', serve_cmd='searcher', deps=['cmd/searcher'] + shared_go_src, resource_deps=['schema'])
lr('replacer', cmd='./dev/go-install.sh replacer', serve_cmd='replacer', deps=['cmd/replacer'] + shared_go_src, resource_deps=['schema'])
lr('symbols', cmd='./dev/go-install.sh symbols', serve_cmd='./cmd/symbols/build.sh execute', deps=['cmd/symbols'] + shared_go_src, resource_deps=['schema'])
lr('github-proxy', cmd='./dev/go-install.sh github-proxy', serve_cmd='github-proxy', deps=['cmd/github-proxy'] + shared_go_src, resource_deps=['schema'])
lr('frontend', cmd='./dev/go-install.sh frontend', serve_cmd='env CONFIGURATION_MODE=server SITE_CONFIG_ESCAPE_HATCH_PATH=$HOME/.sourcegraph/site-config.json frontend', deps=['cmd/frontend'] + shared_go_src, resource_deps=['schema'])
lr('nginx', serve_cmd="nginx -p . -g 'daemon off;' -c $PWD/dev/nginx.conf 2>&1 | grep -v 'could not open error log file'")
lr('web', serve_cmd='./node_modules/.bin/gulp --color watch')
lr('syntect_server', serve_cmd='./dev/syntect_server')
lr('zoekt-indexserver-0', serve_cmd='./dev/zoekt/wrapper indexserver 0')
lr('zoekt-indexserver-1', serve_cmd='./dev/zoekt/wrapper indexserver 1')
lr('zoekt-webserver-0', serve_cmd='./dev/zoekt/wrapper webserver 0')
lr('zoekt-webserver-1', serve_cmd='./dev/zoekt/wrapper webserver 1')

# if keycloak isn't supposed to run, specify it as a cmd instead of a serve_cmd
keycloak_test = str(local('dev/env.sh && ( if [ -n "$NO_KEYCLOAK" ]; then echo "echo Not using Keycloak. Keycloak authentication providers will not work."; fi; if [ -z "$ENTERPRISE" ]; then echo Not using Keycloak. Only runs in enterprise mode.; fi )'))
if keycloak_test.find("Not using Keycloak") == -1:
  lr('keycloak', serve_cmd='./dev/auth-provider/keycloak.sh')
else:
  lr('keycloak', cmd='./dev/auth-provider/keycloak.sh')

# lr('jaeger', serve_cmd='docker run --name=jaeger --rm -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p5778:5778 -p16686:16686 -p14268:14268 jaegertracing/all-in-one:latest')
lr('docsite', serve_cmd='.bin/docsite -config doc/docsite.json serve -http=localhost:5080')
lr('lsif-server', serve_cmd='yarn --cwd lsif run run:server', deps=['cmd/lsif-server'] + shared_go_src, resource_deps=['schema'])
lr('lsif-worker', serve_cmd='yarn --cwd lsif run run:worker')
lr('prometheus', serve_cmd='./dev/prometheus.sh')
lr('grafana', serve_cmd='./dev/grafana.sh')
lr('postgres_exporter', serve_cmd='./dev/postgres_exporter.sh')

lr('generate_graphql', 'go generate github.com/sourcegraph/sourcegraph/cmd/frontend/graphqlbackend', deps=['cmd/frontend/graphqlbackend/schema.graphql'])
lr('generate_jsonnet', 'docker-images/grafana/jsonnet/build.sh', deps=['docker-images/grafana/jsonnet'], ignore=['docker-images/grafana/jsonnet/**/*.json'])
lr('schema', 'go generate github.com/sourcegraph/sourcegraph/schema', deps=['schema'], ignore=['schema/**/*.go'])
lr('codeintel', 'yarn run build-ts')
