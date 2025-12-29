import React from 'react';
import '@primer/css/dist/primer.css'; // Import Primer CSS
import { ThemeProvider, Box, Text, TextInput, Button, Avatar, Heading, TabNav } from '@primer/react'; // Primer components
import { MarkGithubIcon, ThreeBarsIcon, PlusIcon, BellIcon, RepoPullIcon, CheckIcon, IssueOpenedIcon, GitPullRequestIcon, PlayIcon, ProjectIcon, ShieldLockIcon, GraphIcon, SearchIcon, CalendarIcon, ClockIcon } from '@primer/octicons-react'; // Correct icon imports
import { DataTable } from '@primer/react/experimental'
import NavButtons from '../NavButtons/NavButtons'; // Custom NavButtons component
import './DevOpsPage.css'; // Custom styling
import PageTemplate from '../PageTemplate/PageTemplate'; // Custom PageTemplate component

const workflows = [
  {
    name: "pages build and deployment",
    status: "Success",
    branch: "main",
    event: "push",
    time: "last month",
    duration: "39s",
    actor: "EliasLeguizamon123",
  },
  {
    name: "pages build and deployment",
    status: "Success",
    branch: "main",
    event: "schedule",
    time: "4 months ago",
    duration: "37s",
    actor: "EliasLeguizamon123",
  },
];

const DevOpsPage = () => {
  return (
    <PageTemplate>
      <ThemeProvider colorMode="dark">
        <div className="page-layout">
          <aside className="sidebar">
            <Box as="nav">
              <Text as="nav" color="fg.default" ml={3}>
                <Text as="span">Portfolio</Text> / <Text as="span">DevOps-er</Text>
              </Text>
            </Box>
          </aside>

          <main className="main-content">
            <Box className="content-wrapper">
              <Box as="header" bg="canvas.default" p={3} display="flex" alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderBottomStyle="solid" borderColor="border.default">
                <Box display="flex" alignItems="center">
                  <ThreeBarsIcon size={24} color="fg.default" aria-label="Global navigation menu" />
                  <MarkGithubIcon size={32} color="fg.default" aria-label="GitHub" style={{ marginLeft: '1rem' }} />
                </Box>

                <Box display="flex" alignItems="center">
                  <TextInput placeholder="Type '/' to search" sx={{ width: '200px', mr: 3 }} />
                  <Button aria-label="Global Create" variant="invisible" icon={PlusIcon} mr={2} />
                  <Button aria-label="Pull Requests" variant="invisible" icon={RepoPullIcon} mr={2} />
                  <Button aria-label="Notifications" variant="invisible" icon={BellIcon} mr={2} />
                  <Avatar src="https://github.com/octocat.png" size={32} alt="User Avatar" />
                </Box>
              </Box>

              <TabNav aria-label="Repository" sx={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderColor: 'border.default' }}>
                <TabNav.Link href="#code">
                  <MarkGithubIcon size={16} />
                  Code
                </TabNav.Link>
                <TabNav.Link href="#issues">
                  <IssueOpenedIcon size={16} />
                  Issues
                </TabNav.Link>
                <TabNav.Link href="#pull-requests">
                  <GitPullRequestIcon size={16} />
                  Pull requests
                </TabNav.Link>
                <TabNav.Link href="#discussions">
                  Discussions
                </TabNav.Link>
                <TabNav.Link href="#actions" selected>
                  <PlayIcon size={16} />
                  Actions
                </TabNav.Link>
                <TabNav.Link href="#projects">
                  <ProjectIcon size={16} />
                  Projects
                </TabNav.Link>
                <TabNav.Link href="#security">
                  <ShieldLockIcon size={16} />
                  Security
                </TabNav.Link>
                <TabNav.Link href="#insights">
                  <GraphIcon size={16} />
                  Insights
                </TabNav.Link>
              </TabNav>

              <Box width="100%" p={3} border="1px solid" borderColor="border.default" borderRadius={6} mt={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Heading as="h4" fontSize={2} mb={1}>
                      All workflows
                    </Heading>
                    <Text as="p" color="fg.muted">
                      Showing runs from all workflows
                    </Text>
                  </Box>

                  <Box sx={{ width: '250px' }}>
                    <TextInput
                      leadingVisual={SearchIcon}
                      aria-label="Filter workflow runs"
                      placeholder="Filter workflow runs"
                      sx={{ width: '100%' }}
                    />
                  </Box>
                </Box>

                <Text as="p" mb={3}>
                  <strong>32</strong> workflow runs
                </Text>

                <Box>
                  {workflows.map((workflow, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Box display="flex" alignItems="center">
                        <CheckIcon color="success.fg" />
                        <Box ml={2}>
                          <Text as="strong">{workflow.name}</Text>
                          <Text as="p" color="fg.muted">
                            {workflow.name} #{index + 1}: by {workflow.actor}
                          </Text>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Box display="flex" alignItems="center" mr={3}>
                          <CalendarIcon />
                          <Text as="p" ml={1} color="fg.muted">{workflow.time}</Text>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <ClockIcon />
                          <Text as="p" ml={1} color="fg.muted">{workflow.duration}</Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </PageTemplate>
  );
};

export default DevOpsPage;
