shared_go_src = [
  'internal',
  'enterprise',
  'migrations',
  'schema',
]
local_resource('gitserver', cmd='./dev/go-install.sh gitserver', serve_cmd='gitserver', deps=['cmd/gitserver'] + shared_go_src)
local_resource('query-runner', cmd='./dev/go-install.sh query-runner', serve_cmd='query-runner', deps=['cmd/query-runner'] + shared_go_src)
local_resource('repo-updater', cmd='./dev/go-install.sh repo-updater', serve_cmd='repo-updater', deps=['cmd/repo-updater'] + shared_go_src)
local_resource('searcher', cmd='./dev/go-install.sh searcher', serve_cmd='searcher', deps=['cmd/searcher'] + shared_go_src)
local_resource('replacer', cmd='./dev/go-install.sh replacer', serve_cmd='replacer', deps=['cmd/replacer'] + shared_go_src)
local_resource('symbols', cmd='./dev/go-install.sh symbols', serve_cmd='./cmd/symbols/build.sh execute', deps=['cmd/symbols'] + shared_go_src)
local_resource('github-proxy', cmd='./dev/go-install.sh github-proxy', serve_cmd='github-proxy', deps=['cmd/github-proxy'] + shared_go_src)
local_resource('frontend', cmd='./dev/go-install.sh frontend', serve_cmd='env CONFIGURATION_MODE=server SITE_CONFIG_ESCAPE_HATCH_PATH=$HOME/.sourcegraph/site-config.json frontend', deps=['cmd/frontend'] + shared_go_src)
local_resource('nginx', serve_cmd="nginx -p . -g 'daemon off;' -c $PWD/dev/nginx.conf 2>&1 | grep -v 'could not open error log file'")
local_resource('web', serve_cmd='./node_modules/.bin/gulp --color watch')
local_resource('syntect_server', serve_cmd='./dev/syntect_server')
local_resource('zoekt-indexserver-0', serve_cmd='./dev/zoekt/wrapper indexserver 0')
local_resource('zoekt-indexserver-1', serve_cmd='./dev/zoekt/wrapper indexserver 1')
local_resource('zoekt-webserver-0', serve_cmd='./dev/zoekt/wrapper webserver 0')
local_resource('zoekt-webserver-1', serve_cmd='./dev/zoekt/wrapper webserver 1')
local_resource('keycloak', serve_cmd='./dev/auth-provider/keycloak.sh')
# local_resource('jaeger', serve_cmd='docker run --name=jaeger --rm -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p5778:5778 -p16686:16686 -p14268:14268 jaegertracing/all-in-one:latest')
local_resource('docsite', serve_cmd='.bin/docsite -config doc/docsite.json serve -http=localhost:5080')
local_resource('lsif-server', serve_cmd='yarn --cwd lsif run run:server', deps=['cmd/lsif-server'] + shared_go_src)
local_resource('lsif-worker', serve_cmd='yarn --cwd lsif run run:worker')
local_resource('prometheus', serve_cmd='./dev/prometheus.sh')
local_resource('grafana', serve_cmd='./dev/grafana.sh')
local_resource('postgres_exporter', serve_cmd='./dev/postgres_exporter.sh')

local_resource('generate_graphql', 'go generate github.com/sourcegraph/sourcegraph/cmd/frontend/graphqlbackend', deps=['cmd/frontend/graphqlbackend/schema.graphql'])
local_resource('generate_jsonnet', 'docker-images/grafana/jsonnet/build.sh', deps=['docker-images/grafana/jsonnet'], ignore=['docker-images/grafana/jsonnet/**/*.json'])
local_resource('schema', 'go generate github.com/sourcegraph/sourcegraph/schema', deps=['schema'], ignore=['schema/**/*.go'])
